import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  Chip,
  useMediaQuery,
  CardActionArea,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

type UserCardProps = {
  name: string;
  role?: string;
  status?: "Active" | "Inactive" | string;
  avatarUrl?: string;
  layout?: "compact" | "full";
  onClick?: () => void;
};

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const UserCard: React.FC<UserCardProps> = ({
  name,
  role,
  status = "Active",
  avatarUrl,
  layout = "full",
  onClick,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const showCompact = layout === "compact" || isSm;

  const avatar =
    avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0D8ABC&color=fff`;

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      {/* CardActionArea makes the card clickable if onClick provided */}
      <CardActionArea onClick={onClick} disabled={!onClick}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            {showCompact ? (
              <SmallAvatar alt={name} src={avatar} />
            ) : (
              <LargeAvatar alt={name} src={avatar} />
            )}

            <Stack direction="column" spacing={0.3} sx={{ minWidth: 0 }}>
              <Typography noWrap variant={showCompact ? "subtitle1" : "h6"}>
                {name}
              </Typography>

              {/* role only visible in full layout */}
              {!showCompact && (
                <Typography variant="body2" color="text.secondary" noWrap>
                  {role ?? "—"}
                </Typography>
              )}

              {/* status displayed as chip in full layout or small text in compact */}
              {showCompact ? (
                <Typography variant="caption" color="text.secondary">
                  {status}
                </Typography>
              ) : (
                <Stack direction="row" spacing={1} mt={1}>
                  <Chip
                    size="small"
                    label={status}
                    color={status === "Active" ? "primary" : "default"}
                    aria-label={`status-${name}`}
                  />
                </Stack>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
