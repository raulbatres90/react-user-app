import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import UserCard from "../components/UserCard";
import { useUsers } from "../hooks/useUsers";

const UsersPage: React.FC = () => {
  const { users, loading, error } = useUsers();
  const [filter, setFilter] = useState("");
  const [layout, setLayout] = useState<"full" | "compact">("full");

  const filtered = useMemo(
    () =>
      users.filter((u) => u.name.toLowerCase().includes(filter.toLowerCase())),
    [users, filter]
  );

  return (
    <Container sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" component="h1">
          Users
        </Typography>

        <ToggleButtonGroup
          value={layout}
          exclusive
          onChange={(_, v) => v && setLayout(v)}
          aria-label="layout"
          size="small"
        >
          <ToggleButton value="full" aria-label="full">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="compact" aria-label="compact">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TextField
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
        placeholder="Filter by name.."
        variant="outlined"
        size="small"
        sx={{ mb: 3 }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">Error cargando usuarios</Typography>
      ) : (
        <Grid>
          {filtered.map((u) => (
            <Grid key={u.id}>
              <UserCard
                name={u.name}
                role={u.email}
                status="Active"
                avatarUrl={`https://api.dicebear.com/7.x/identicon/svg?seed=${u.username}`}
                layout={layout}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UsersPage;
