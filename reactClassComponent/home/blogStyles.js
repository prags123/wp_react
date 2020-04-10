const blogStyles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    width: "100%",
    height: "200px"
  },
  cardContent: {
    flexGrow: 1,
    paddingBottom:"0 !important"
  },
  footerHome: {
    backgroundColor: "#eeeee",
    padding: "16px !important",
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  margin: {
   marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 6,
   marginTop:theme.spacing.unit * 1,
   marginBottom:theme.spacing.unit * 2
  },
  customBadge: {
   backgroundColor: "#00AFD7",
   color: "white",
   padding: "0 10px",
   borderRadius: "5px",
   fontWeight: "bold",
   width: "max-content"
 },
 postTitle:{
   margin:"8px 0px",
   fontWeight:900
 },
 postMeta:{
    margin:"8px 0px"
 },
 commentSection:{
   backgroundColor: "#eeeeee",
   marginBottom:"36px",
   borderRadius: "5px"
 },
 inputLabel: {
    fontSize:"1.5em",
    fontWeight:"bold",
    "&.focused": {
      color: "purple",
      fontWeight:"bold"
    }
  },
  commentBadge:{
    color: "white",
    padding: "0 10px",
    borderRadius: "2px",
    fontWeight: "bold",
    width: "max-content",
    transform: "translate(0%, -0%)",
    'transform-origin':0
  }


});

export default blogStyles;
