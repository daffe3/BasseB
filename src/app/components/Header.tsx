"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          px: { xs: 1, sm: 2, md: 3 },
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Link href="/" passHref>
            <Image
              src="/images/logoBB.png"
              alt="Basse Brodd Logo"
              width={100}
              height={100}
              style={{
                cursor: "pointer",
                maxHeight: "100px",
                width: "auto",
              }}
            />
          </Link>
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: { xs: 2, md: 4 },
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/gallery">
            Gallery
          </Button>
          <Button color="inherit" component={Link} href="/lunch-delivery">
            Lunch Delivery
          </Button>
          <Button color="inherit" component={Link} href="/inquiry">
            Inquiry Form
          </Button>
          <Button color="inherit" component={Link} href="/contact">
            Contact
          </Button>
        </Box>

        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} href="/">
              Home
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} href="/gallery">
              Gallery
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              href="/lunch-delivery"
            >
              Lunch Delivery
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} href="/inquiry">
              Inquiry Form
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} href="/contact">
              Contact
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
