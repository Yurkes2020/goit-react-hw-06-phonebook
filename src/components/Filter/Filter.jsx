import { FilterLabel } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'Redux/Store';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterSlice = useSelector(state => state.filter.filter);

  const change = event => {
    dispatch(filter(event.target.value));
  };
  return (
    <FilterLabel>
      Find contacts by name
      <input onChange={change} value={filterSlice} type="text" name="filter" />
    </FilterLabel>
  );
};
