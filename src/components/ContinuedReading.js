import React from "react"
import { Link } from "gatsby"
import styled from "styled-components";
import Image from "gatsby-image"
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const ContinuedReadingContainer = styled.section`
    display: flex;
    justify-content: space-between;
    max-width: 730px;
    width: 100%;
    margin: 24px 0;
    border-top: ${props => `1px solid ${props.theme.textColor}`};

    justify-content: space-between;
`

const NextPostContainer = styled(Link)`
    color: ${props => props.theme.textColor};
    text-decoration: none;

    display: flex;
    flex: 1;
    align-items: center;
    margin: 0 5px;

    &:hover, &:focus {
    color: ${props => props.theme.primaryColor};
    }
`

const NextPostPreview = styled.div`
    max-width: 200px;
    padding: 24px 0;
    flex: 1;
    text-align: center;
`

export default function ContinuedReading({prev, next}) {
    return (
    <ContinuedReadingContainer>
        {prev
            ? <NextPostContainer to={`/tea-reviews/${prev.slug}`}>
                <MdKeyboardArrowLeft size={48} style={{ marginRight: 10 }} />
                <NextPostPreview>
                <Image 
                fluid={prev.thumbnail.fluid}
                style={{ marginBottom: 10, maxHeight: 200, height: '100%' }}
                imgStyle={{ objectFit: 'contain' }}
                />
                {`${prev.teaSource} ${prev.teaName}`}
                </NextPostPreview>
            </NextPostContainer>
            : <div style={{ flex: 1 }} /> }
        {next
            ? <NextPostContainer style={{ justifyContent: 'flex-end' }} to={`/tea-reviews/${next.slug}`}>
                <NextPostPreview>
                <Image 
                fluid={next.thumbnail.fluid}
                style={{ marginBottom: 10, maxHeight: 200, height: '100%' }}
                imgStyle={{ objectFit: 'contain' }}
                />
                {`${next.teaSource} ${next.teaName}`}
                </NextPostPreview>
                <MdKeyboardArrowRight size={48} style={{ marginLeft: 10 }} />
            </NextPostContainer>
            : <div style={{ flex: 1 }} /> }
        </ContinuedReadingContainer>
    )
}