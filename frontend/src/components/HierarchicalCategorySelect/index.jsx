import React from 'react';
import {
  FormControl,
  InputLabel,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const CategoryTreeItem = ({ category, depth = 0, value, onChange, expanded, onToggle }) => {
  const hasChildren = category.subCategories?.length > 0;

  return (
    <>
      <ListItem 
        disablePadding
        sx={{ pl: depth * 2 }}
      >
        <ListItemButton
          onClick={() => {
            onChange({ target: { value: category.id } });
            if (hasChildren) {
              onToggle(category.id);
            }
          }}
          sx={{
            backgroundColor: value === category.id ? 'action.selected' : 'transparent',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <ListItemText 
            primary={category.name}
            sx={{
              '& .MuiTypography-root': {
                fontWeight: hasChildren ? 500 : 400,
              }
            }}
          />
          {hasChildren && (
            expanded.includes(category.id) ? <ExpandLess /> : <ExpandMore />
          )}
        </ListItemButton>
      </ListItem>
      {hasChildren && (
        <Collapse in={expanded.includes(category.id)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.subCategories.map(subCategory => (
              <CategoryTreeItem
                key={subCategory.id}
                category={subCategory}
                depth={depth + 1}
                value={value}
                onChange={onChange}
                expanded={expanded}
                onToggle={onToggle}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const HierarchicalCategorySelect = ({ categories, value, onChange, label = "Catégorie" }) => {
  const [expandedItems, setExpandedItems] = React.useState([]);

  const handleToggle = (categoryId) => {
    setExpandedItems(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Box sx={{ mt: 3, border: 1, borderColor: 'divider', borderRadius: 1, p: 1 }}>
        <List component="nav" sx={{ width: '100%' }}>
          {categories
            .filter(cat => !cat.parentCategoryId)
            .map(category => (
              <CategoryTreeItem
                key={category.id}
                category={category}
                value={value}
                onChange={onChange}
                expanded={expandedItems}
                onToggle={handleToggle}
              />
            ))}
        </List>
      </Box>
    </FormControl>
  );
};

export default HierarchicalCategorySelect;