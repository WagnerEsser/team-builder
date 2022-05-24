import styled from 'styled-components'
import { Box, TextareaAutosize, TextField } from '@mui/material'
import { containerBorderColor, containerBackgroundColor } from '../../colors'

export const WrapperContainer = styled(Box)`
    border: 1px solid;
    border-radius: 24px;
    padding: 32px;
    margin-top: 32px;
    margin-bottom: 32px;
    border-color: ${containerBorderColor};
    background-color: ${containerBackgroundColor};
`

export const TextArea = styled(TextareaAutosize)`
    border-radius: 12px;
    border-color: ${containerBorderColor};
    padding: 16px;
    margin-top: 12px;
    font-family: "Roboto";
    font-size: 16px;
`

TextArea.defaultProps = ({ minRows: 18 });

export const FlexBox = styled(Box)`
    display: flex;
`

export const TextAreaWrapper = styled(FlexBox)`
    flex-direction: column;
`

export const FlexBoxCenter = styled(FlexBox)`
    align-items: center;
    justify-content: center;
`

export const PlayerQtyTextField = styled(TextField)`
    width: 50px;
    text-align: center;
`