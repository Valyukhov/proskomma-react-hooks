# useSuccinctDocSetLoad

```js
import { useState } from 'react';
import {
  useProskomma, useImport, useCatalog, useSuccinctDocSetSerialize, useSuccinctDocSetLoad,
} from 'proskomma-react-hooks';
import ReactJson from 'react-json-view';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({bookCode, bookName, ...props}) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' }, 
  data: loremIpsumBook({ bookCode, bookName, ...props }),
  bookCode, 
});

const documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: 'mar', bookName: 'Mark', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1, verseMax: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1, verseMax: 1 }),
];

const verbose = false;

function Component () {
  const [startImport, setStartImport] = useState(false);
  const [startSerialize, setStartSerialize] = useState(false);
  const [startLoad, setStartLoad] = useState(false);

  const _documents = startImport ? documents : [];
  const _docSetId = startSerialize ? 'unfoldingWord/lat_lor' : undefined;

  const {
    stateId,
    newStateId,
    proskomma,
    errors: proskommaErrors,
  } = useProskomma({
    verbose,
  });

  const {
    errors: importErrors,
  } = useImport({
    proskomma,
    stateId,
    newStateId,
    documents: _documents,
    verbose,
  });

  const {
    stateId: catalogStateId,
    catalog,
    errors: catalogErrors, 
  } = useCatalog({
    proskomma,
    stateId,
    verbose,
  });

  const {
    stateId: serializeStateId,
    errors: serializeErrors,
    succinctDocSet,
  } = useSuccinctDocSetSerialize({
    proskomma,
    stateId,
    docSetId: _docSetId,
    verbose,
  });

  const {
    stateId: stateId2,
    newStateId: newStateId2,
    proskomma: proskomma2,
    errors: proskommaErrors2,
  } = useProskomma({
    verbose,
  });

  const {
    stateId: catalogStateId2,
    catalog: catalog2,
    errors: catalogErrors2, 
  } = useCatalog({
    proskomma: proskomma2,
    stateId: stateId2,
    verbose,
  });

  const _succinctDocSet = startLoad ? succinctDocSet : undefined;

  const {
    errors: loadErrors,
  } = useSuccinctDocSetLoad({
    proskomma: proskomma2,
    stateId: stateId2,
    newStateId: newStateId2,
    succinctDocSet: _succinctDocSet,
    verbose,
  });

  const json = {
    stateId,
    succinctDocSet,
    catalogStateId,
    catalog,
    serializeStateId,
    serializeErrors,
    stateId2,
    catalogStateId2,
    catalog2,
    loadErrors,
  };

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={json}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => {setStartImport(true);}}>Import</button>
      <button style={{margin: '1em'}} onClick={() => {setStartSerialize(true);}}>Serialize</button>
      <button style={{margin: '1em'}} onClick={() => {setStartLoad(true);}}>Load</button>
    </>
  );
};

<Component />
```
