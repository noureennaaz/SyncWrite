import TextEditor from "./TextEditor";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
const DocumentPage = ({id, body})=>{
    return (
        <Document>
                <Page  size="A4" >
                    <TextEditor id ={id} body={body}/>
                </Page>
            
            </Document>
    )
}
export default DocumentPage;