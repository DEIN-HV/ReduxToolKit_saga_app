
import { Pagination } from '@material-ui/lab';
import { PaginationParams } from 'models';
import * as React from 'react';

// export interface ChangePage {
//     e: any;
//     page: number;
// }

export interface PaginationItemProps {
    pagination: PaginationParams;
    onChangePage?: (e: any, page: number) => void
}

export function PaginationItem({ pagination, onChangePage }: PaginationItemProps) {

    const { _limit, _page, _totalRows } = pagination;
    const count = Math.ceil(_totalRows / _limit);

    // const handleChangePage = (e: any, page: number) => {
    //     console.log(page)
    // }

    return (
        <Pagination count={count} color="primary" page={_page} onChange={onChangePage} boundaryCount={2} />
    );
}



