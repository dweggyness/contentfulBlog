import React from "react"
import styled from "styled-components"
import { Link } from "gatsby";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const Pagination = styled.nav`
    display: flex;
    align-items: center;
`

const PageNumber = styled(Link)`
    display: flex;
    align-items: center;
    font-family: 'Open Sans';
    font-size: 18px;
    margin: 0 8px;
    color: ${props => props.theme.textColor};
    text-decoration: none;

    &:hover, &:focus {
        transition: 0.1s all ease-in;
        color: ${props => props.theme.primaryColor};
    }
`

const ActivePageNumber = styled.span`
    font-family: 'Open Sans';
    font-size: 18px;
    margin: 0 8px;
    font-weight: 600;
`

// displays a pagination component, e.g < (1) 2 3 ... 5 >

// arrayToBeGenerated
// [<, 1, 2, ..., 7, 8, 9, ..., 12, 13, >]

export default function Switch({ style, navProps, currentPage = 1, numberOfPages = 1 }) {
    const shouldRenderLeftArrow = currentPage > 1;
    const shouldRenderRightArrow = currentPage < numberOfPages;

    const generateArrayToRender = () => {
        const arr = [];
        let pageNo = 0;
        if (shouldRenderLeftArrow) arr.push('<');

        // renders left side of ellipsis 1,2, ...
        while(pageNo < 2) {
            pageNo += 1;
            if (pageNo > numberOfPages) break;
            arr.push(pageNo);
        }

        // renders middle ( between L & R ellipsis) ...5, 6, 7,...
        if (currentPage <= 4) { // no elipsis 1,2,3,4
            while(pageNo < currentPage + 1) {
                pageNo += 1;
                if (pageNo > numberOfPages) break;
                arr.push(pageNo);
            }
        } else { // there is elipsis 1,2,...,4,5
            arr.push('...')
            pageNo = currentPage - 2;
            while(pageNo < currentPage + 1) {
                pageNo += 1;
                if (pageNo > numberOfPages) break;
                arr.push(pageNo);
            }
        }

        // renders right side of ellipsis   ..., 9, 10
        if (numberOfPages - currentPage >= 4 ) { // there is elipsis 4,5,6,...8,9
            arr.push('...');
            pageNo = numberOfPages - 2;
            while(pageNo < numberOfPages) {
                pageNo += 1;
                arr.push(pageNo);
            }
        } else { // no elipsis 4,5,6,7,8
            while(pageNo < numberOfPages) {
                pageNo += 1;
                arr.push(pageNo);
            }
        }

        if (shouldRenderRightArrow) arr.push('>');
        return arr;
    }

    const arrayToBeRendered = generateArrayToRender();
    const navSlugFront = currentPage === 1 ? '.' : '..';

    return (
        <Pagination style={style}>
            {arrayToBeRendered.map((element, i) => {
                let content = '';
                let navLink = '/tea-reviews';
                if (element === '<') {
                    content = <MdKeyboardArrowLeft style={{ marginTop: 5 }} />;
                    let navSlug = '';
                    if (currentPage - 1 !== 1) navSlug = currentPage - 1;
                    navLink = `${navSlugFront}/${navSlug}`;
                }
                else if (element === '>') {
                    content = <MdKeyboardArrowLeft style={{ marginTop: 5 }} />;
                    navLink = `${navSlugFront}/${currentPage + 1}`;
                } else if (element === currentPage) {
                    return (
                        <ActivePageNumber key={i}>
                            {element}
                        </ActivePageNumber>
                    )
                } else if (element === 1) {
                    content = element;
                    navLink = `${navSlugFront}/`;
                } else if (element !== '...') {
                    content = element;
                    navLink = `${navSlugFront}/${element}`
                }
                else return <PageNumber key={i}>{element}</PageNumber>

                return (
                    <PageNumber state={navProps} key={i} to={navLink}>
                        {content}
                    </PageNumber>
                )
            })}
        </Pagination>
    )
}