import { sortTodoAsc } from '@/redux/actions/todoAction';
import { TodoState } from '@/redux/reducers/todoReducer';
import { ReduxState } from '@/redux/store';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TaskOrderManager = () => {
    const dispatch = useDispatch();
	const sortedBy = useSelector<ReduxState, TodoState['sortedBy']>(
		(state) => state.todo.sortedBy
	);
	const sortAsc = useSelector<ReduxState, boolean>(
		(state) => state.todo.sortedAsc
	);

    const handleChangeSortingOrder = () => {
        dispatch(sortTodoAsc(!sortAsc))
    }

    const displayText = useMemo(() => {
        switch (sortedBy) {
            case 'priority':
                return 'priority';
            case 'dueDate':
                return 'due date';
            case 'plannedFinishDate':
                return 'planned finish date';
            default:
                return '';
        }
    }, [sortedBy]);

	return (
		<div className='mb-1 flex justify-end'>
			<div className='cursor-pointer' onClick={handleChangeSortingOrder}>{sortAsc ? <ChevronDown size={20} /> : <ChevronUp size={20} />}</div>
			<div className='text-sm text-right text-zinc-400'>
				sorted by {displayText}
			</div>
		</div>
	);
};

export default TaskOrderManager;
