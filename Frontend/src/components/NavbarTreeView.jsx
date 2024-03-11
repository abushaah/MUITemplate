import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/matrial/styles';
import { Box, Typography } from '@mui/Matrial';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChavronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';
import routes from '../routes';

const LinkedTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    margin: theme.spacing(1, 0),
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused' : {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: `var(--tree-view-color)`,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function LinkedTreeItem(props) {
    const theme = useTheme ();
    const {
        bgColor,
        color,
        labelIcon,
        labelInfo,
        labekText,
        colorForDarkMode,
        bgColorForDarkMode,
        to,
        ...other
    } = props;

    const styleProps = {
        'tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
        'tree-view-bg-color': theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
    };

    return (
        <LinkedTreeItemRoot
            label={
                <Link to={to} style={{ textDecoration: 'none' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1,
                            pr: 0,
                        }}
                    >
                        <Box component={labelIcon} color={theme.palette.icons.main} sx={{ mr: 2 }} />
                        <Typography variant="body2" sx={{ flexGrow: 1, color: theme.palette.navbar.main }}>
                            {labelText}
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography>
                    </Box>
                </Link>
            }
            style={styleProps}
            {...other}
        />
    );
}

LinkedTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.object,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    colorForDarkMode: PropTypes.string,
    bgColorForDarkMode: PropTypes.string,
    to: PropTypes.string.isRequired,
}

export default function NavbarTreeView () {
    const theme = useTheme();
    return (
        <TreeView
            aria-label="navbar"
            defaultExpanded={['3']}
            defaultCollapseIcon={<ExpandMoreIcon style={{ fill: theme.palette.navbar.main }} />}
            defaulExpandIcon={<ChavronRightIcon style={{ fill: theme.palette.navbar.main }} />}
            sx={{ overflowY: 'auto '}}
        >
            {routes.map(({ path, name, Icon, nestedRoutes }) => (
                <LinkedTreeItem key={name} nodeId={name} labelText={name} labelIcon={Icon} to={path}>
                    {nestedRoutes?.map((nestedRoute) => (
                        <LinkedTreeItem
                            key={nestedRoute.name}
                            nodeId={nestedRoute.name}
                            labelText={nestedRoute.name}
                            labelIcon={nestedRoute.Icon}
                            to={nestedRoute.path}
                            color="#5F249A"
                        />
                    ))}
                </LinkedTreeItem>
            ))}
        </TreeView>
    );
}