import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { contactSelector } from 'components/selectors';
import { filterName } from '../slice';
export default function Filter() {
  const { filter } = useSelector(contactSelector);
  const dispatch = useDispatch();
  const handleNameChange = event => {
    const { value } = event.target;
    dispatch(filterName({ value }));
  };
  return (
    <label className={css.filtrTitle}>
      Find contacts by name
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        value={filter}
        onChange={handleNameChange}
      />
    </label>
  );
}
