import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
// eslint-disable-next-line import/no-unresolved
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MenuProps from '../../constants/navigation.props.json';

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: '#f0f0f0',
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)'
    }
  },
  content: {
    color: '#fefefe',
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2)
    }
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit'
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1
  }
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  let itemLabel = null;
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    navPath,
    isRootMenu,
    ...other
  } = props;

  const baseLabel = (
    <div className={classes.labelRoot}>
      <LabelIcon color="inherit" className={classes.labelIcon} />
      <Typography variant="body2" className={classes.labelText}>
        {labelText}
      </Typography>
      <Typography variant="caption" color="inherit">
        {labelInfo}
      </Typography>
    </div>
  );
  console.log('isRootMenu ', isRootMenu);
  if (isRootMenu) {
    itemLabel = baseLabel;
  } else {
    itemLabel = <Link to={navPath}>{baseLabel}</Link>;
  }
  return (
    <TreeItem
      label={itemLabel}
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  navPath: PropTypes.string,
  isRootMenu: PropTypes.bool
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400
  }
});

const Menus = MenuProps.map((menu, id) => {
  let isRootMenu = false;
  if (menu.childs.length > 0) {
    isRootMenu = true;
  }
  return (
    // console.log(id)
    <StyledTreeItem
      nodeId={menu.name}
      labelText={menu.name}
      labelIcon={SupervisorAccountIcon}
      // labelInfo="90"
      color="#1a73e8"
      bgColor="#e8f0fe"
      isRootMenu={isRootMenu}
      navPath={menu.path}
    >
      {/* <StyledTreeItem nodeId={`${menu.name}``${'b'}`} labelText="Trash" labelIcon={DeleteIcon} /> */}
      {menu.childs.length > 0
        ? // eslint-disable-next-line camelcase
          menu.childs.map((childMenu, c_id) => (
            <StyledTreeItem
              nodeId={childMenu.name}
              labelText={childMenu.name}
              labelIcon={SupervisorAccountIcon}
              // labelInfo="90"
              isRootMenu={false}
              color="#1a73e8"
              bgColor="#e8f0fe"
              navPath={childMenu.path}
            />
          ))
        : null}
    </StyledTreeItem>
  );
});

export default function MenuTreeView() {
  const classes = useStyles();
  console.log(MenuProps);

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      {Menus}
     {/* <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={MailIcon} />
      <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
      <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={Label}>
        <StyledTreeItem
          nodeId="5"
          labelText="Social"
          labelIcon={SupervisorAccountIcon}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Updates"
          labelIcon={InfoIcon}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="7"
          labelText="Forums"
          labelIcon={ForumIcon}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
        />
        <StyledTreeItem
          nodeId="8"
          labelText="Promotions"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
      </StyledTreeItem>
  <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} /> */}
    </TreeView>
  );
}
