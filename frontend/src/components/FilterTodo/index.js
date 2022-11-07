import { Checkbox, FormControlLabel, Box } from "@mui/material";
import PropTypes from "prop-types";

const FilterTodo = ({ filter, filterTodo }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end">
      <FormControlLabel
        control={<Checkbox checked={filter} onClick={filterTodo} />}
        label="Overdue Today"
      />
    </Box>
  );
};

FilterTodo.propTypes = {
  filter: PropTypes.bool.isRequired,
  filterTodo: PropTypes.func.isRequired,
};

export default FilterTodo;
