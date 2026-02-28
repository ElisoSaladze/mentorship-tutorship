import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  adminGetAllProgramSchemes,
  deleteProgramScheme,
} from "~/api/program-scheme/api";
import SchemesTable from "~/components/admin-schemes-table";
import SchemeDialog from "~/components/admin-scheme-dialog";

const AdminSchemesPage = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [openSchemeDialog, setOpenSchemeDialog] = useState<boolean>(false);
  const [editingScheme, setEditingScheme] =
    useState<TYPES.ProgramSchemeResponse | null>(null);

  const { data, isLoading, error } = useQuery<
    TYPES.PageResponse<TYPES.ProgramSchemeResponse>
  >({
    queryKey: ["adminSchemes", page, rowsPerPage],
    queryFn: () => adminGetAllProgramSchemes(page, rowsPerPage),
  });

  // ✅ DELETE MUTATION (typed)
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await deleteProgramScheme(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminSchemes"] });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this scheme?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Schemes & Courses</Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingScheme(null);
            setOpenSchemeDialog(true);
          }}
        >
          Add Scheme
        </Button>
      </Box>

      <SchemesTable
        data={data}
        loading={isLoading}
        error={error}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsChange={setRowsPerPage}
        onEdit={(scheme: TYPES.ProgramSchemeResponse) => {
          setEditingScheme(scheme);
          setOpenSchemeDialog(true);
        }}
        onDelete={handleDelete}
      />

      <SchemeDialog
        open={openSchemeDialog}
        onClose={() => setOpenSchemeDialog(false)}
        editingScheme={editingScheme}
      />
    </Box>
  );
};

export default AdminSchemesPage;
