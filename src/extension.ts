import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Insert custom boilerplate
  let insertBoilerplate = vscode.commands.registerCommand('pyassistpro.insertBoilerplate', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.insertSnippet(new vscode.SnippetString(`# Python Script\n\ndef main():\n\tprint("Hello from PyAssistPro")\n\nif __name__ == "__main__":\n\tmain()`));
    }
  });

  // Provide basic keyword completions
  const completionProvider = vscode.languages.registerCompletionItemProvider('python', {
    provideCompletionItems(document, position) {
      const keywords = [
        { label: 'for loop', insertText: 'for i in range(10):\n\tprint(i)', documentation: 'Standard for loop' },
        { label: 'if __name__', insertText: 'if __name__ == "__main__":\n\tmain()', documentation: 'Entry point' },
        { label: 'try except', insertText: 'try:\n\t# your code\nexcept Exception as e:\n\tprint(e)', documentation: 'Exception handling' },
        { label: 'function', insertText: 'def my_function():\n\tpass', documentation: 'Function definition' },
        { label: 'class', insertText: 'class MyClass:\n\tdef __init__(self):\n\t\tpass', documentation: 'Class definition' },
        { label: 'list comprehension', insertText: '[x for x in iterable]', documentation: 'List comprehension' },
        { label: 'with open', insertText: 'with open("file.txt", "r") as f:\n\tdata = f.read()', documentation: 'File handling with context manager' },
        { label: 'lambda', insertText: 'lambda x: x + 1', documentation: 'Anonymous function' },
        { label: 'enumerate', insertText: 'for idx, val in enumerate(items):\n\tprint(idx, val)', documentation: 'Enumerate with index' },
        { label: 'zip', insertText: 'for a, b in zip(list1, list2):\n\tprint(a, b)', documentation: 'Zip two iterables' },
        { label: 'dict comprehension', insertText: '{k: v for k, v in iterable}', documentation: 'Dictionary comprehension' },
        { label: 'main function', insertText: 'def main():\n\tpass\n\nif __name__ == "__main__":\n\tmain()', documentation: 'Standard main function structure' },
        { label: 'f-string', insertText: 'name = "World"\nprint(f"Hello, {name}!")', documentation: 'Formatted string literal' },
        { label: 'property decorator', insertText: '@property\ndef value(self):\n\treturn self._value', documentation: 'Property getter' },
        { label: 'staticmethod', insertText: '@staticmethod\ndef greet():\n\tprint("Hello")', documentation: 'Static method in class' },
        { label: 'classmethod', insertText: '@classmethod\ndef from_dict(cls, data):\n\treturn cls(**data)', documentation: 'Class method in class' },
        { label: 'list slice', insertText: 'my_list[start:stop:step]', documentation: 'List slicing' },
        { label: 'assert', insertText: 'assert condition, "Error message"', documentation: 'Assert statement' },
        { label: 'logging', insertText: 'import logging\nlogging.basicConfig(level=logging.INFO)\nlogging.info("Log message")', documentation: 'Logging setup' },
        { label: 'type hints', insertText: 'def func(x: int) -> str:\n\treturn str(x)', documentation: 'Function with type hints' },
        { label: 'dataclass', insertText: 'from dataclasses import dataclass\n\n@dataclass\nclass MyData:\n\tname: str\n\tage: int', documentation: 'Dataclass declaration' },
        { label: 'set', insertText: 'my_set = set([1, 2, 3])', documentation: 'Set creation' },
        { label: 'isinstance', insertText: 'if isinstance(obj, ClassName):\n\tprint("Yes")', documentation: 'Check object type' },
        { label: 'map', insertText: 'result = map(lambda x: x * 2, iterable)', documentation: 'Map function usage' },
        { label: 'filter', insertText: 'result = filter(lambda x: x > 0, iterable)', documentation: 'Filter function usage' },
        { label: 'range', insertText: 'for i in range(1, 11):\n\tprint(i)', documentation: 'Range function in loop' }
      ];


      return keywords.map(item => {
        const completion = new vscode.CompletionItem(item.label, vscode.CompletionItemKind.Snippet);
        completion.insertText = new vscode.SnippetString(item.insertText);
        completion.documentation = new vscode.MarkdownString(item.documentation);
        return completion;
      });
    }
  }, '.'); // Trigger on any character

  context.subscriptions.push(insertBoilerplate, completionProvider);
}

export function deactivate() {}
