import styled, { css } from "styled-components";

export const CustomButton = styled.button`
    color: #ffffff;
    border: none;
    vertical-align: middle;
    border-radius: 0.375rem;
    padding: 6px 12px;
    ${props => props.$primary && css`
        background: #d52933;    
    `}
    
    ${props => props.$green && css`
        background: #1aa659;    
    `}
`

