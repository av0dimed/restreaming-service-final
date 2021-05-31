import React, {useEffect, useState} from 'react'
import useStyles from '../Styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {Button, IconButton, Link, Radio, TextField} from '@material-ui/core'
import {Delete} from '@material-ui/icons'

export default function StreamUrlTable(props) {
    const classes = useStyles()
    const [rows, setRows] = [props.data, props.setData]
    const [selectedActive, setSelectedActive] = [props.selected, props.setSelected]
    const [validationError, setValidationError] = useState(false)
    const [input, setInput] = useState('')

    useEffect(() => {
        setValidationError(rows.includes(input))
    }, [input])

    const handleChange = (e) => {
        setSelectedActive(e.target.value === '' ? null : e.target.value)
    }

    const onDelete = (name) => {
        console.log(name)
        if (selectedActive !== name) {
            setRows(rows.filter((row) => row !== name))
        }
    }

    const onInputChange = (e) => {
        setInput(e.target.value)
    }

    const onSubmit = () => {
        if (!validationError) {
            setRows((state) => [...state, input])
            setInput('')
        }
    }

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Ссылка</TableCell>
                    <TableCell align='center'>Активна</TableCell>
                    <TableCell align='center'>Удалить ссылку</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell className={classes.cell} scope='row'>
                        Отсутсвующий источник стрима
                    </TableCell>
                    <TableCell align='center'>
                        <Radio
                            checked={selectedActive === null}
                            value={null}
                            onChange={handleChange}
                            disabled={props.disabled}
                        />
                    </TableCell>
                    <TableCell />
                </TableRow>
                {rows.map((row) => (
                    <TableRow key={row}>
                        <TableCell className={classes.cell} scope='row'>
                            <Link color='inherit' href={row}>
                                {row}
                            </Link>
                        </TableCell>
                        <TableCell align='center'>
                            <Radio
                                checked={selectedActive === row}
                                value={row}
                                onChange={handleChange}
                                disabled={props.disabled}
                            />
                        </TableCell>
                        <TableCell align='center'>
                            <IconButton
                                aria-label='delete'
                                aria-controls='delete the row'
                                onClick={() => onDelete(row)}
                                color='secondary'
                                disabled={props.disabled}>
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell colSpan={2}>
                        <TextField
                            value={input}
                            label='Добавить ссылку'
                            fullWidth
                            error={validationError}
                            helperText={validationError ? 'Такой ресурс уже был добавлен' : null}
                            onChange={onInputChange}
                            disabled={props.disabled}></TextField>
                    </TableCell>
                    <TableCell>
                        <Button onClick={onSubmit} disabled={props.disabled}>
                            Добавить
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
