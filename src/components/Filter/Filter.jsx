import PropTypes from 'prop-types';
import css from './Filter.module.css';
export default function Filter({ value, onChange }) {
  return (
    <label className={css.filtrTitle}>
      Find contacts by name
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
