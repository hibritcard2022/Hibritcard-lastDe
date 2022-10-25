import * as React from 'react'

export function format(iban) {
    if (!iban) {
        return ''
    }

    const cleanIban = iban
        .replace(/\s\s+/g, ' ')
        .replace(/[^0-9a-zA-Z]/gi, '')
        .toUpperCase()

    const parts = []

    if (cleanIban.length > 0) {
        parts.push(cleanIban.substring(0, 4))
    }

    if (cleanIban.length > 4) {
        parts.push(cleanIban.substring(4, 8))
    }

    if (cleanIban.length > 8) {
        parts.push(cleanIban.substring(8, 12))
    }

    if (cleanIban.length > 12) {
        parts.push(cleanIban.substring(12, 16))
    }

    if (cleanIban.length > 16) {
        parts.push(cleanIban.substring(16, 20))
    }

    if (cleanIban.length > 20) {
        parts.push(cleanIban.substring(20, 22))
    }

    return parts.join(' ')
}

export class IBAN extends React.Component {
    constructor(props) {
        super(props)

        const newState = this.ibanState(props.initialValue || '')

        if (this.props.onChange) {
            this.props.onChange({
                value: newState.formattedIban,
                iban: newState.iban
            })
        } else {
            this.state = newState
        }
    }

    onChange = event => {
        const ibanInput = event.target.value || ''
        const newState = this.ibanState(ibanInput)

        if (this.props.onChange) {
            this.props.onChange({
                value: newState.formattedIban,
                iban: newState.iban
            })
        } else {
            this.setState(newState)
        }
    }

    ibanState = input => {
        const iban = input.replace(/[^0-9a-zA-Z]/gi, '').toUpperCase()

        return {
            iban: iban.substring(0, 22),
            formattedIban: format(iban)
        }
    }

    renderFn() {
        return this.props.children || this.props.render
    }

    render() {
        const { onChange, type, value, initialValue, ...restProps } = this.props

        if (this.props.onChange) {
            return this.renderFn()({
                onChange: this.onChange,
                value: this.props.value,
                iban: this.props.iban,
                type: 'text',
                size: 27,
                ...restProps
            })
        }

        return this.renderFn()({
            onChange: this.onChange,
            value: this.state.formattedIban,
            iban: this.state.iban,
            type: 'text',
            size: 27,
            ...restProps
        })
    }
}

export default IBAN