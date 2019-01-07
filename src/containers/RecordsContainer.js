import { connect } from 'react-redux';

import Records from '../components/Records';

const mapStateToProps = (state) => {
  return {
    records: state.records
  };
}

const RecordsContainer = connect(mapStateToProps, null)(Records);

export default RecordsContainer;
