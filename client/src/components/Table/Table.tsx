import * as S from './Table.style';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export interface BootData {
  bootcampId: number;
  title: string;
  beginRegisterDate: string;
  finalRegisterDate: string;
  process: string;
  totalCost: string;
  onOff: string;
}

/**
 * 테이블 항목 td 클릭시 이벤트 핸들러
 */
const onClick = () => {
  // 브라우저 스크롤 가장 위로 올리기
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

/**
 *  테이블 콤포넌트
 * @param data
 * @returns 
 */
export const Table = function({ data }: any) {
  const columnHelper = createColumnHelper<BootData>();
  const columns = [
    columnHelper.accessor('title', { header: '이름' }),
    columnHelper.accessor('beginRegisterDate', { header: '접수일' }),
    columnHelper.accessor('finalRegisterDate', { header: '접수마감일' }),
    columnHelper.accessor('process', { header: '과정' }),
    columnHelper.accessor('totalCost', { header: '총 비용' }),
    columnHelper.accessor('onOff', { header: '온/오프라인' }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <S.TableWrap>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, idx) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                <Link to={`/bootcamp/${data[idx].bootcampId}`} onClick={onClick}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Link>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </S.TableWrap>
  );
};

/**
 * 모바일용 테이블 콤포넌트
 *  S.MobileComp에서 모바일일경우 보여주도록 컨트롤
 * @param data 
 * @returns 
 */
export const MobileTable = function({ data }: any) {
  return (
    <>
      {data.map((el: any, idx: number) => (
        <S.MobileComp key={idx}>
          <div>
            <S.MobileLeft>
              <div>{`${el.beginRegisterDate}`}</div>
            </S.MobileLeft>
            <S.MobileMiddle to={`/bootcamp/${data[idx].bootcampId}`} onClick={onClick}>
              <div>
                <div>{el.title}</div>
              </div>
              <div>{el.process}</div>
            </S.MobileMiddle>
            <S.MobileRight>
              <div>
                <div>{el.onOff}</div>
                <div>{el.totalCost}</div>
              </div>
            </S.MobileRight>
          </div>
        </S.MobileComp>
      ))}
    </>
  );
};
