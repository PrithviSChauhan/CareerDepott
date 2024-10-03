import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>List of your Applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right" >Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                [1,2,3,4].map((item, index)=>(
                    <TableRow key={index}>
                        <TableCell>03-10-2024</TableCell>
                        <TableCell>Full-Stack Developer</TableCell>
                        <TableCell>ShadcnUI</TableCell>
                        <TableCell className="text-right"><Badge>pending</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
