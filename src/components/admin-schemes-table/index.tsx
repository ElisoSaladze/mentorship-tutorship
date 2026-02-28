import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  TablePagination,
  Typography,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import { Edit, Delete, School } from "@mui/icons-material";
import SchemeImage from "../scheme-iamge";

interface Props {
  data?: TYPES.PageResponse<TYPES.ProgramSchemeResponse>;
  loading: boolean;
  error: unknown;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsChange: (rows: number) => void;
  onEdit: (scheme: TYPES.ProgramSchemeResponse) => void;
  onDelete: (id: string) => void;
}

const SchemesTable = ({
  data,
  loading,
  error,
  page,
  rowsPerPage,
  onPageChange,
  onRowsChange,
  onEdit,
  onDelete,
}: Props) => {
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Failed to load schemes</Typography>;
  }

  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 64 }}>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Creator</TableCell>
            <TableCell>Courses</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.content.map((scheme) => (
            <TableRow key={scheme.id}>
              {/* IMAGE */}
              <TableCell>
                <SchemeImage resourceId={scheme.file0?.[0]} />
              </TableCell>

              {/* TITLE */}
              <TableCell>
                <Typography fontWeight={500}>{scheme.title}</Typography>
              </TableCell>

              {/* DESCRIPTION */}
              <TableCell>
                <Typography
                  color="text.secondary"
                  sx={{
                    maxWidth: 300,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {scheme.description}
                </Typography>
              </TableCell>

              {/* CREATOR */}
              <TableCell>
                {scheme.creatorUserData
                  ? `${scheme.creatorUserData.name} ${scheme.creatorUserData.surname}`
                  : "-"}
              </TableCell>

              {/* COURSES PLACEHOLDER */}
              <TableCell>
                <Chip
                  icon={<School sx={{ fontSize: 16 }} />}
                  label="..."
                  size="small"
                  variant="outlined"
                />
              </TableCell>

              {/* ACTIONS */}
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onEdit(scheme)}>
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(scheme.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}

          {data?.content.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                No program schemes found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={data?.totalElements ?? 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) => onRowsChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default SchemesTable;
