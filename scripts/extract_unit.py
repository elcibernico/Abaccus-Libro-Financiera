import docx
import sys
import os

def extract_text_from_docx(docx_path, output_path):
    try:
        doc = docx.Document(docx_path)
        full_text = []
        for para in doc.paragraphs:
            text = para.text.strip()
            if not text:
                continue
                
            # Detect if it's a list item (bullet or numbered)
            is_list = False
            if para.style.name.startswith('List'):
                is_list = True
            
            # Check for numbering property in XML as fallback
            if not is_list and para._element.xpath('w:pPr/w:numPr'):
                is_list = True
                
            if is_list:
                full_text.append(f"- {text}")
            else:
                full_text.append(text)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(full_text))
        print(f"Extraction successful: {output_path}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python extract_unit.py <input_docx> <output_txt>")
        sys.exit(1)
    
    extract_text_from_docx(sys.argv[1], sys.argv[2])
