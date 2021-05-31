import {Button, Dialog, DialogActions, DialogContent, IconButton, Typography} from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {Delete, SettingsBackupRestore} from '@material-ui/icons'
import React, {useState} from 'react'
import {deleteManager, resetManagerPassword} from '../../services/AdminRequests'
import useStyles from '../../Styles'

function BasicAdminTable(props) {
    const classes = useStyles()
    const [rows] = [props.data]
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState()

    const onDelete = () => {
        deleteManager(selected.name, props.callback)
        closeDialog()
    }

    const onRestore = () => {
        resetManagerPassword(selected.name, props.callback)
        closeDialog()
    }

    const openDialog = (name, isRestore) => {
        setOpen(true)
        setSelected({name, isRestore})
    }

    const closeDialog = () => {
        setOpen(false)
        setSelected()
    }

    return (
        <>
            {selected && (
                <Dialog open={open} onClose={closeDialog}>
                    <DialogContent>
                        <Typography>
                            {selected.isRestore
                                ? 'Вы действительно хотите сбросить транспортный пароль?'
                                : 'Вы действительно хотите удалить данного пользователя?'}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' color='primary' onClick={closeDialog}>
                            Отмена
                        </Button>
                        <Button variant='contained' color='primary' onClick={selected.isRestore ? onRestore : onDelete}>
                            {selected.isRestore ? 'Сбросить' : 'Удалить'}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Менеджер</TableCell>
                        <TableCell align='center'>Транспортный пароль</TableCell>
                        <TableCell align='center'>Сбросить пароль</TableCell>
                        <TableCell align='center'>Удалить менеджера</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell className={classes.cell2}>{row.username}</TableCell>
                            <TableCell align='center'>{row.password} </TableCell>
                            <TableCell align='center'>
                                <IconButton
                                    aria-label='password'
                                    aria-controls='restore the password'
                                    onClick={() => openDialog(row.username, true)}
                                    color='secondary'>
                                    <SettingsBackupRestore />
                                </IconButton>
                            </TableCell>
                            <TableCell align='center'>
                                <IconButton
                                    aria-label='delete'
                                    aria-controls='delete the row'
                                    onClick={() => openDialog(row.username, false)}
                                    color='secondary'>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default BasicAdminTable
