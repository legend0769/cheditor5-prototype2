import React, {  useState } from 'react';
import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor  } from '@ckeditor/ckeditor5-react';
import './styles/content-styles-editor.css';
//import './styles/content-styles-front.css';
import './styles/contentsdb_style.css';
import xhtml from './mock/test1/xhtml'
import { Col, Row, Space, Button } from 'antd';
import parse from 'html-react-parser'
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

const editorConfiguration = {
    // toolbar: [ 'bold', 'italic' ]
    heading: {
        options: [
            { model: 'heading1', view:'h1', title: '見出し：タイトル' },
            { model: 'paragraph', view: 'p', title: '見出し：Q', class: 'question' },
            { model: 'paragraph', view: 'p', title: '見出し：A', class: 'answer' }
        ]
    },
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ]
    }
};

const App = () => {

    const [data,setData] = useState(xhtml.data);
    const [model,setModel] = useState(1);

    const editorChangeHandle = (data)=>{
        setData(data);
    }

    return (
        <>
        <Row>
            <Col span={12}>
                <div>
                <CKEditor
                    editor={ ClassicEditor }
                    config={ editorConfiguration }
                    data={data}
                    onReady={ editor => {
                        CKEditorInspector.attach( editor );
                        this.editor = editor;
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        editorChangeHandle(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                </div>
            </Col>
            <Col span={12}>
                <Space>
                    <Button onClick={()=>{setModel(1)}}>source model</Button>
                    <Button onClick={()=>{setModel(2)}}>html model</Button>
                </Space>
                <br/>
                <br/>
                {model ===1?(<div>{data}</div>):null}
                {model ===2?(<div>{parse(data)}</div>):null}
            </Col>
        </Row>
        </>
    );
}

export default App;