import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import {
    TreeItemContent,
    TreeItemIconContainer,
    TreeItemRoot,
    TreeItemGroupTransition,
} from '@mui/x-tree-view/TreeItem';
import { useTreeItem } from '@mui/x-tree-view/useTreeItem';
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider';
import { TreeItemIcon } from '@mui/x-tree-view/TreeItemIcon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import routes from '../../routes';

// helpful sources: https://mui.com/x/react-tree-view/simple-tree-view/customization/

const CustomTreeItemRoot = styled(TreeItemRoot)(({ theme, ownerState }) => ({
    '--tree-view-color': ownerState.color,
    '--tree-view-bg-color': ownerState.bgColor,
    color: (theme.vars || theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        '--tree-view-color': ownerState.colorForDarkMode,
        '--tree-view-bg-color': ownerState.bgColorForDarkMode,
    }),
}));

const CustomTreeItemContent = styled(TreeItemContent)(({ theme }) => ({
    marginBottom: theme.spacing(0.3),
    color: (theme.vars || theme).palette.text.secondary,
    borderRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
    fontWeight: theme.typography.fontWeightMedium,
    '&[data-expanded]': {
        fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
    },
    '&[data-focused], &[data-selected], &[data-selected][data-focused]': {
        backgroundColor: `var(--tree-view-bg-color, ${(theme.vars || theme).palette.action.selected})`,
        color: 'var(--tree-view-color)',
    },
}));

const CustomTreeItemIconContainer = styled(TreeItemIconContainer)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
    const theme = useTheme ();
    const {
        id,
        itemId,
        label,
        disabled,
        children,
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        colorForDarkMode,
        bgColorForDarkMode,
        to,
        ...other
    } = props;

    const {
        getContextProviderProps,
        getRootProps,
        getContentProps,
        getIconContainerProps,
        getLabelProps,
        getGroupTransitionProps,
        status,
    } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

    const treeItemRootOwnerState = {
        color,
        bgColor,
        colorForDarkMode,
        bgColorForDarkMode,
    };

    return (
        <TreeItemProvider {...getContextProviderProps()}>
            <CustomTreeItemRoot
                {...getRootProps(other)}
                ownerState={treeItemRootOwnerState}
                {...other}
            >
                <CustomTreeItemContent {...getContentProps()}>
                    <CustomTreeItemIconContainer {...getIconContainerProps()}>
                        <TreeItemIcon status={status} />
                    </CustomTreeItemIconContainer>
                    {/* Custom: adding the "to" for url to different pages */}
                    <Link to={to} style={{ textDecoration: 'none' }}>
                        <Box
                            sx={{
                            display: 'flex',
                            flexGrow: 1,
                            alignItems: 'center',
                            p: 0.5,
                            pr: 0,
                            }}
                        >
                        <Box component={LabelIcon} sx={{ mr: 1, color: theme.palette.navbar.main }} />
                            <Typography
                                {...getLabelProps({
                                    variant: 'body2',
                                    sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1, color: theme.palette.navbar.main, },
                                })}
                            />
                            <Typography variant="caption" sx={{ color: theme.palette.navbar.main }}>
                                {labelInfo}
                            </Typography>
                        </Box>
                    </Link>
                </CustomTreeItemContent>
                {children && <TreeItemGroupTransition {...getGroupTransitionProps()} />}
            </CustomTreeItemRoot>
        </TreeItemProvider>
    );
});

function EndIcon() {
    return <div style={{ width: 24 }} />;
}

export default function NavbarTreeView() {
    const theme = useTheme();
    return (
        <SimpleTreeView
            aria-label="navbar"
            defaultExpandedItems={['3']}
            sx={{ overflowY: 'auto '}}
            slots={{
            expandIcon: ArrowRightIcon,
            collapseIcon: ArrowDropDownIcon,
            endIcon: EndIcon,
            }}
            itemChildrenIndentation={20}
        >
            {/* Custom: iterating through the routes to create tree items for pages */}
            {routes.map(({ path, name, Icon, nestedRoutes }, index) => (
                <CustomTreeItem
                    key={index + 1}
                    itemId={name}
                    label={name}
                    labelIcon={Icon}
                    to={path}
                >
                    {nestedRoutes?.map((nestedRoute, nestedIndex) => (
                        <CustomTreeItem
                            key={routes.length + nestedIndex + 1}
                            itemId={nestedRoute.name}
                            label={nestedRoute.name}
                            labelIcon={nestedRoute.Icon}
                            to={nestedRoute.path}
                        />
                    ))}
                </CustomTreeItem>
            ))}
        </SimpleTreeView>
    );
}