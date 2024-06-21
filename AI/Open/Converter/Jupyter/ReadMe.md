# Convert Messages to Jupyter Notebooks

## MacOS/Linux

```python
import json
import os
import subprocess
import sys
from datetime import datetime


def get_downloads_path():
    downloads = "./tmp"
    if not os.path.exists(downloads):
        os.makedirs(downloads)
    return downloads


def install_and_import(package):
    try:
        module = __import__(package)
    except ImportError:
        try:
            # Install the package silently with pip
            print("")
            print(f"Installing {package}...")
            print("")
            subprocess.check_call(
                [sys.executable, "-m", "pip", "install", package],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            module = __import__(package)
        except subprocess.CalledProcessError:
            # If pip fails, try pip3
            try:
                subprocess.check_call(
                    [sys.executable, "-m", "pip3", "install", package],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                )
            except subprocess.CalledProcessError:
                print(f"Failed to install package {package}.")
                return
    finally:
        globals()[package] = module
    return module


def jupyter(data, filename):
    # Dynamically install nbformat if not already installed
    nbformat = install_and_import("nbformat")
    from nbformat.v4 import new_notebook, new_code_cell, new_markdown_cell

    downloads = get_downloads_path()
    notebook_path = os.path.join(downloads, filename)
    nb = new_notebook()
    cells = []

    # Check if data is a list (expected structure)
    if not isinstance(data, list):
        print(f"Unexpected structure in file: {filename}")
        return

    # Check if all elements in the list have the required keys
    valid_data = [msg for msg in data if all(key in msg for key in ["role", "message"])]

    if len(valid_data) != len(data):
        print(f"Missing keys in file: {filename}")

    for msg in valid_data:
        if msg["role"] == "user":
            # Prefix user messages with '>' to render them as block quotes, so they stand out
            content = f"> {msg['message']}"
            cells.append(new_markdown_cell(content))
        elif msg["role"] == "assistant":
            if "message" in msg:
                cells.append(new_markdown_cell(msg["message"]))
            if "code" in msg:
                code_cell = new_code_cell(msg["code"])
                if "language" in msg:
                    code_cell.metadata.update({"language": msg["language"]})
                cells.append(code_cell)

    nb["cells"] = cells

    with open(notebook_path, "w", encoding="utf-8") as f:
        nbformat.write(nb, f)


# Load all json files in the current directory
json_files = [f for f in os.listdir(".") if f.endswith(".json")]

for json_file in json_files:
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    current_time = datetime.now()
    formatted_time = current_time.strftime("%m-%d-%y-%I%M%p")
    notebook_filename = (
        f"interpreter-{formatted_time}-{os.path.splitext(json_file)[0]}.ipynb"
    )
    jupyter(data, notebook_filename)

```
