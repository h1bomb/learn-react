import React from "react";
import { Table, Button } from "antd";

const tablePanel = ({ list, onDismiss, isLoading, pagination, onChange }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a,b) => a.title.localeCompare(b.title),
      render: (text, row) => {
        return <a href={row.url}>{text}</a>;
      }
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      sorter: (a,b) => a.author.localeCompare(b.author)
    },
    {
      title: "Comments",
      dataIndex: "num_comments",
      sorter: (a,b) => a.num_comments - b.num_comments
    },
    {
      title: "Points",
      dataIndex: "points",
      sorter: (a,b) => a.points - b.points
    },
    {
      title: "Archive",
      render: (text, row) => {
        return (
          <Button
            onClick={() => onDismiss(row.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        );
      }
    }
  ];
  return <Table 
  rowKey="objectID" 
  columns={columns} 
  dataSource={list}
  onChange = {onChange}
  pagination = {pagination}
  loading = {isLoading}
  />;
};

export default tablePanel;
