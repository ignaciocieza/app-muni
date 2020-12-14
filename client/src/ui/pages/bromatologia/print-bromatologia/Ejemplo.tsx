import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

//https://stackoverflow.com/questions/56852191/is-there-any-way-to-add-table-in-react-pdf
//https://github.com/diegomura/react-pdf/issues/206#issuecomment-372387877
export default function Ejemplo() {
  return (
    <PDFViewer style={{ width: "100vw", height: "100vh" }}>
      <Document>
        <Page orientation="landscape" size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
