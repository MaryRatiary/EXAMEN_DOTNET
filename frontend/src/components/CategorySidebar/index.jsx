import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Typography,
  Paper,
  Slide,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const CategoryItem = ({ category, depth = 0, onCategorySelect, expandedCategories, toggleCategory }) => {
  const hasSubCategories = category.subCategories?.length > 0;
  const isExpanded = expandedCategories.has(category.id);

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          pl: depth * 2,
        }}
      >
        <ListItemButton
          onClick={() => {
            onCategorySelect(category.id);
            if (hasSubCategories) {
              toggleCategory(category.id);
            }
          }}
          sx={{
            pl: 2,
            borderRadius: '8px',
            my: 0.5,
            transition: 'all 0.2s ease-in-out',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '3px',
              height: '0%',
              backgroundColor: 'primary.main',
              transition: 'height 0.2s ease-in-out',
            },
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              '&::before': {
                height: '70%',
              }
            },
            ...(hasSubCategories && {
              borderLeft: 0,
            }),
          }}
        >
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontWeight: hasSubCategories ? 600 : 400,
                  color: 'text.primary',
                  fontSize: '0.95rem',
                }}
              >
                {category.name}
              </Typography>
            }
            secondary={category.description && (
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.8rem',
                  mt: 0.5,
                }}
              >
                {category.description}
              </Typography>
            )}
          />
          {hasSubCategories && (
            <Box 
              sx={{ 
                transition: 'transform 0.3s ease',
                transform: isExpanded ? 'rotate(-180deg)' : 'rotate(0)',
              }}
            >
              <ExpandMore />
            </Box>
          )}
        </ListItemButton>
      </ListItem>

      {hasSubCategories && (
        <Collapse in={isExpanded} timeout="auto">
          <List component="div" disablePadding>
            {category.subCategories.map(subCategory => (
              <CategoryItem
                key={subCategory.id}
                category={subCategory}
                depth={depth + 1}
                onCategorySelect={onCategorySelect}
                expandedCategories={expandedCategories}
                toggleCategory={toggleCategory}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const CategorySidebar = ({ categories, onCategorySelect }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Paper
        elevation={0}
        sx={{
          width: 280,
          height: '100%',
          overflowY: 'auto',
          borderRadius: 0,
          backgroundColor: 'white',
          borderRight: '1px solid',
          borderColor: 'divider',
          '::-webkit-scrollbar': {
            width: '8px',
          },
          '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
            '&:hover': {
              background: '#666',
            },
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Catégories
          </Typography>
        </Box>
        <List
          component="nav"
          sx={{
            px: 2,
            pb: 2,
          }}
        >
          {categories
            .filter(cat => !cat.parentCategoryId)
            .map(category => (
              <CategoryItem
                key={category.id}
                category={category}
                onCategorySelect={onCategorySelect}
                expandedCategories={expandedCategories}
                toggleCategory={toggleCategory}
              />
            ))}
        </List>
      </Paper>
    </Slide>
  );
};

export default CategorySidebar;