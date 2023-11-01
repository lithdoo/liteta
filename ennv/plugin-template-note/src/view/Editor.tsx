import { Block, BlockNoteEditor, defaultProps } from "@blocknote/core";
import { BlockNoteView, InlineContent, createReactBlockSpec, useBlockNote } from "@blocknote/react";
import { useState } from "react";
import styled from "styled-components"
import "@blocknote/core/style.css";


const EditorCntr = styled.div`
    postion:relative;
    height:100%;
    overflow: auto;

    .mantine-Editor-root{
        width: 100%;
        max-width: 800px;
        margin: 48px auto;
    }

    .content-view, .content-view *{
        transition: all 0.3s ease-out;
    }
    .content-view{
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(248,248,248,0.8);
        overflow: auto;

        &[data-show="true"]{
            left: 0;
            padding: 16px;
        }

        &[data-show="false"]{
            left: 100%;
            padding: 0;
        }
    }

    .toggle-btn{
        position: absolute;
        top: 16px;right:16px;
        height: 32px;
        line-height: 32px;
        width: 56px;
        text-align: center;
        border-radius: 8px;
        color: #fff;
        font-weight: bold;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
        cursor: pointer;
        &::after{
            content:"CODE";
        }
        &::before{
            content:"CLOSE";
        }

        
        &::after , &::before{
            transition: all 0.3s ease-out;
            display:block;
            position:absolute;
            top:0;
            bottom:0;
            left:0;
            right:0;
        }
     }

     [data-show="true"] + .toggle-btn{
        background: #CC444B;
        &::after{ opacity:0; }
     }

     [data-show="false"] + .toggle-btn{
        background: #66ccff;
        &::before{ opacity: 0; }
     }

`

export const Editor = () => {
    const [blocks, setBlocks] = useState<Block[] | null>(null);
    const [showCode, setShowCode] = useState<boolean>(false)
    const editor: BlockNoteEditor = useBlockNote({
        onEditorContentChange: (editor) =>setBlocks(editor.topLevelBlocks)
    });
    // Renders the editor instance using a React component.
    return <EditorCntr>
        <BlockNoteView editor={editor} theme={"light"} />
        <div className="content-view" data-show={showCode}>
            <pre>{JSON.stringify(blocks, null, 2)}</pre>
        </div>
        <div className="toggle-btn" onClick={()=>setShowCode(!showCode)}></div>
    </EditorCntr>
}

const ImageBlock = createReactBlockSpec({
    type: "image",
    propSchema: {
      ...defaultProps,
      src: {
        default: "https://via.placeholder.com/1000",
      },
      alt: {
        default: "image",
      },
    },
    containsInlineContent: true,
    render: ({ block }) => (
      <div id="image-wrapper">
        <img
          src={block.props.src}
          alt={block.props.alt}
          contentEditable={false}
        />
        <InlineContent />
      </div>
    ),
  });