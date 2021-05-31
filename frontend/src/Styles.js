import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {},
    beautifulButton: {
        color: '#7e57c2',
        background: 'linear-gradient(45deg, #f6b9e5 30%, #b9f6ca 90%)',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    coloredText: {
        color: '#b9f6ca',
    },
    beautifulToolbar: {
        background: 'linear-gradient(45deg, #7e57c2 30%, #f6b9e5 70%)',
    },
    dialogPaper: {
        background: '#222222cc',
    },
    dialogTitle: {
        color: '#f6b9e5',
    },
    main: {
        margin: theme.spacing(2),
    },
    headerTitle: {
        flexGrow: 1,
        textDecoration: 'none',
    },
    playerContainer: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        height: theme.spacing(90),
    },
    playerWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 5,
        backgroundColor: '#4f4f4f',
    },
    player: {},
    table: {
        stickyHeader: true,
        width: '100%',
    },
    cell: {
        overflow: 'auto',
        width: '1000px',
        maxWidth: '1000px',
        color: '#f6b9e5',
    },
    cell2: {
        overflow: 'auto',
        color: '#f6b9e5',
        width: '600px',
    },
    StreamPanelContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        minWidth: '700px',
        width: '50%',
    },
    StreamPanelContainerr: {
        display: 'flex',
        justifyContent: 'center',
    },
    streamPanelTitle: {},
    streamPanelHeader: {
        display: 'flex',
    },
    StreamPanelLayout: {},
    layoutRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'nowrap',
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    chat: {
        flexGrow: 1,
        maxWidth: '400px',
    },
    chatPaper: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-end',
        height: theme.spacing(90),
    },
    chatBox: {
        flexGrow: 1,
        overflowWrap: 'anywhere',
        margin: theme.spacing(2),
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0.7em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,255,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.09)',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#f6b9e5',
            outline: '1px solid slategrey',
        },
    },
    chatButton: {
        marginBottom: theme.spacing(1),
    },
    iconButton: {
        '& svg': {
            fontSize: 30,
        },
    },
    tagChip: {
        marginRight: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
        color: '#000000',
    },
    streamerGridItem: {
        margin: theme.spacing(1),
        width: theme.spacing(60),
        height: theme.spacing(30),
        display: 'flex',
        flexDirection: 'column',
    },
    chipsInGrid: {
        display: 'flex',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.7em',
            height: '0.7em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,255,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.09)',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#f6b9e5',
            outline: '1px solid slategrey',
        },
    },
}))

export default useStyles
