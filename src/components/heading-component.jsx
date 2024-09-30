import styled, { css } from "styled-components";

export const Heading1 = styled.h1`
    text-align: center;
`

export const Title = styled.h5`
text-align: center;
    ${props => props.$primary && css`
        text-decoration: underline;
        text-align: left;
        `}
`

