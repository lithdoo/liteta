import {
    BlockNoteEditor,
    BlockSchema,
    DefaultBlockSchema,
    defaultBlockSchema,
    defaultProps,
  } from "@blocknote/core";
  import {
    BlockNoteView,
    useBlockNote,
    createReactBlockSpec,
    InlineContent,
    ReactSlashMenuItem,
    getDefaultReactSlashMenuItems,
  } from "@blocknote/react";
  import "@blocknote/core/style.css";
  import { RiImage2Fill } from "react-icons/ri";
  
  export default function App() {
    // Creates a custom image block.
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
  
    // The custom schema, which includes the default blocks and the custom image
    // block.
    const customSchema = {
      // Adds all default blocks.
      ...defaultBlockSchema,
      // Adds the custom image block.
      image: ImageBlock,
    } satisfies BlockSchema;
  
    // Creates a slash menu item for inserting an image block.
    const insertImage: ReactSlashMenuItem<typeof customSchema> = {
      name: "Insert Image",
      execute: (editor) => {
        const src: string | null = prompt("Enter image URL");
        const alt: string | null = prompt("Enter image alt text");
  
        editor.insertBlocks(
          [
            {
              type: "image",
              props: {
                src: src || "https://via.placeholder.com/1000",
                alt: alt || "image",
              },
            },
          ],
          editor.getTextCursorPosition().block,
          "after"
        );
      },
      aliases: ["image", "img", "picture", "media"],
      group: "Media",
      icon: <RiImage2Fill />,
      hint: "Insert an image",
    };
  
    // Creates a new editor instance.
    const editor = useBlockNote({
      // Tells BlockNote which blocks to use.
      blockSchema: customSchema,
      slashMenuItems: [
        ...getDefaultReactSlashMenuItems(customSchema),
        insertImage,
      ],
    });
  
    // Renders the editor instance using a React component.
    return <BlockNoteView editor={editor} theme={"light"} />;
  }