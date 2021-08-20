import { useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';
import { studentActions } from '../studentSlice';

export function ListPage() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(studentActions.fecthStudentList({
            _page: 1,
            _limit: 15,
        }));
    }, [])

    return (
        <div>
            List page
        </div>
    );
}
