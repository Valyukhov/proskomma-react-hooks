import {
  searchTermsClause,
  attTermsClause,
} from './search';

export const searchForBookCodesQuery = ({ text, docSetId }) => {
  const _searchTermsClause = searchTermsClause(text);
  const _attTermsClause = attTermsClause(text);

  // TODO: figure out why this doesn't work with more than one book
  const _sortClause = ''; // false ? `        sortedBy: "paratext"\n` : '';

  const bookCodeMatchQuery = `{
    docSet( id:"${docSetId}" ) {
      documents(` +
    _sortClause + `
        allChars: true
        withMatchingChars: [${_searchTermsClause}]
${(_attTermsClause.length > 0) ?
      `        withScopes: [${_attTermsClause}]
        allScopes: true
` : ''
    }      ) {
        bookCode: header( id:"bookCode" ) 
      }
    }
  }`;
  return bookCodeMatchQuery;
};

export const searchForBookCodesFilter = ({ data }) => {
  let bookCodes = [];

  if (data && data.docSet && data.docSet.documents) {
    bookCodes = data?.docSet?.documents?.map((book) => book.bookCode);
  };
  return bookCodes;
};