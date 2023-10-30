import ReactDOM from 'react-dom/client'
import { BlockNoteEditor , type Block} from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useState } from 'react';

function App() {
  // Creates a new editor instance.
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const editor: BlockNoteEditor = useBlockNote({onEditorContentChange: (editor) => 
    // Converts the editor's contents to an array of Block objects.
    setBlocks(editor.topLevelBlocks)});
  // Renders the editor instance using a React component.
  return <div>
  <BlockNoteView editor={editor} theme={"light"} />
  <pre>{JSON.stringify(blocks, null, 2)}</pre>
</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <App/>
  // </React.StrictMode>,
)
