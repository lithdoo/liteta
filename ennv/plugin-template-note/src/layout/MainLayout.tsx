import { type ReactNode } from "react"
import styled from "styled-components"

const MainLayoutStyle = styled.div`
    height: 100%;
    display: flex;
    flex-direaction: row;
    .sider{
        flex: 0 0 auto;    
    }
    .editor{
        flex: 1 1 auto
    }
`

export const MainLayout = ({sider,editor}:{
    sider:ReactNode,
    editor:ReactNode
})=>{
    return <MainLayoutStyle>
        <div className="sider">{sider}</div>
        <div className="editor">{editor}</div>
    </MainLayoutStyle>
}