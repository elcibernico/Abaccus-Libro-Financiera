import json
import re
import os

def process_text_to_json(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    data = {
        "unit": "01",
        "title": "Operaciones Financieras de Capitalización Simple y Compuesta",
        "sections": []
    }

    started = False
    current_section = None
    in_bibliography = False
    
    # Simple state machine to parse the specific format
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Skip intro text
        if not started and not (line.startswith("1.") or "GLOSARIO" in line):
            continue
        started = True
            
        # Glossary
        if "GLOSARIO DINÁMICO" in line:
            continue
        
        # Section titles
        if re.match(r'^\d+\.\d+\.', line) or re.match(r'^\d+\.', line):
            if "DESARROLLO DE CONTENIDO" in line:
                continue
            current_section = {
                "id": line.split(' ')[0],
                "title": ' '.join(line.split(' ')[1:]),
                "items": []
            }
            data["sections"].append(current_section)
            in_bibliography = False
            continue

        # Filter out technical instructions and AI-to-AI notes
        technical_keywords = [
            "[PROMPT PARA IA DE CÓDIGO]", "Lógica del Slider", "Variables para Programación", 
            "Concepto: El alumno debe visualizar", "El gráfico debe", "Incluir un slider",
            "La visualización debe", "Concepto Didáctico", "Comportamiento:",
            "resaltar el 'punto de quiebre'", "Al mover el slider", "Rango n:",
            "donde la curva exponencial", "donde la recta (simple)", "intersectan en el valor",
            "se vuelve más convexa", "períodos fraccionarios", "marcar visualmente", 
            "punto de coincidencia", "concavidad de la curva", "análisis de derivadas",
            "El eje X representa"
        ]
        if any(kw.lower() in line.lower() for kw in technical_keywords):
            continue
            
        # Regex for technical math expressions often found in prompts
        if re.search(r'\$n\s*[<>]\s*1\$', line) or re.search(r'n\s*=\s*1:', line) or re.search(r'^\$f\(n\)', line) or re.search(r'^Slider [A-Z]', line) or "rango 0.05 a 0.50" in line or re.search(r'Capital inicial', line) or re.search(r'Eje X', line):
            continue

        if "BIBLIOGRAFÍA DE LA UNIDAD" in line:
            in_bibliography = True
            current_section["items"].append({"mode": "both", "type": "text", "content": "### BIBLIOGRAFÍA DE LA UNIDAD\n"})
            continue

        # Modes
        if line.startswith("TEXTO BASE (Nivel Estudiante):"):
            content = line.replace("TEXTO BASE (Nivel Estudiante):", "").strip()
            current_section["items"].append({"mode": "essential", "type": "text", "content": content})
        elif line.startswith("Modo Experto:"):
            content = line.replace("Modo Experto:", "").strip()
            current_section["items"].append({"mode": "expert", "type": "text", "content": content})
        elif "[INDICADOR DE GRÁFICO]" in line:
            current_section["items"].append({"mode": "both", "type": "chart", "content": "Comparison Chart", "metadata": {"chartType": "comparison"}})
        elif line.startswith("Caso "):
            current_section["items"].append({"mode": "both", "type": "example", "content": line})
        elif "Feedback:" in line:
            # Group quiz elements: find the question and options before this feedback
            feedback_text = line.replace("Feedback:", "").strip()
            
            # Extract previous items that belong to this quiz
            options = []
            
            # Look back for A), B), C) or - A), - B), - C)
            while current_section["items"] and (current_section["items"][-1]["content"].strip().startswith(("A)", "B)", "C)", "- A)", "- B)", "- C)"))):
                options.insert(0, current_section["items"].pop()["content"])
            
            # The one before options should be the question
            question = ""
            if current_section["items"]:
                question = current_section["items"].pop()["content"]
            
            # Detect correct index from feedback keywords or default
            correct_index = 0 # Default to A
            feedback_norm = re.sub(r'\s+', '', feedback_text.lower())
            
            # Check for explicit A/B/C mentions
            if "C)" in feedback_text or "opción C" in feedback_text.lower():
                correct_index = 2
            elif "B)" in feedback_text or "opción B" in feedback_text.lower():
                correct_index = 1
            elif "A)" in feedback_text or "opción A" in feedback_text.lower():
                correct_index = 0
            else:
                # Try finding option text matches (longer matches first, space-insensitive)
                found = False
                for i, opt in enumerate(options):
                    opt_clean = re.sub(r'^(- )?[A-C]\)\s*', '', opt).strip()
                    opt_norm = re.sub(r'\s+', '', opt_clean.lower())
                    if opt_norm and opt_norm in feedback_norm:
                        correct_index = i
                        found = True
                        break
                
                if not found:
                    # Fallback to specific keywords
                    if "73/72" in feedback_norm or "365/360" in feedback_norm:
                        for i, opt in enumerate(options):
                            if "73/72" in opt.replace(' ', '') or "365/360" in opt.replace(' ', ''):
                                correct_index = i
                    elif "disminuye" in feedback_norm or "decreciente" in feedback_norm:
                        for i, opt in enumerate(options):
                            if "disminuye" in opt.lower() or "decreciente" in opt.lower():
                                correct_index = i
                    elif "aumenta" in feedback_norm or "creciente" in feedback_norm:
                         for i, opt in enumerate(options):
                            if "aumenta" in opt.lower() or "creciente" in opt.lower():
                                correct_index = i
            
            current_section["items"].append({
                "mode": "both", 
                "type": "quiz", 
                "question": question,
                "options": options,
                "feedback": feedback_text,
                "correctIndex": correct_index
            })
        else:
            if current_section:
                if in_bibliography:
                    current_section["items"][-1]["content"] += line + "\n\n"
                else:
                    # Logic to group lists and continuous text
                    # Don't group if it's a quiz option
                    is_quiz_option = line.strip().startswith(("A)", "B)", "C)", "- A)", "- B)", "- C)"))
                    if line.startswith("-") and not is_quiz_option and current_section["items"] and current_section["items"][-1]["type"] == "text":
                         # Append to previous item if it's the same mode or both
                         current_section["items"][-1]["content"] += "\n" + line
                    else:
                        current_section["items"].append({"mode": "both", "type": "text", "content": line})

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"JSON generated: {output_path}")

if __name__ == "__main__":
    process_text_to_json(".tmp/unidad_01.txt", "src/data/unidad_01.json")
