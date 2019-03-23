import React from 'react';
import { Grid, Box, Row, Col } from '@smooth-ui/core-sc'

import {colors, fonts, media} from '../theme';
import logoSvg from '../icons/logo.svg';
import Link from '../Link'

import { version } from '../../package.json'

const AppHeader = ({location}) => (
  <Box
    style={{
      backgroundColor: colors.darker,
      color: colors.white,
      // position: 'fixed',
      zIndex: 1,
      width: '100%',
      top: 0,
      left: 0,
    }}>
    <Grid p={1}>
      <Row>
        <Col>
          <Link
            style={{
              display: 'flex',
              marginRight: 10,
              height: '100%',
              alignItems: 'center',
              color: colors.brand,

              ':focus': {
                outline: 0,
                color: colors.white,
              },

              [media.greaterThan('small')]: {
                width: 'calc(100% / 6)',
              },
              [media.lessThan('small')]: {
                flex: '0 0 auto',
              },
            }}
            to="/">
            <img src={logoSvg} alt="" height="20" />
            <Box
              as='span'
              style={{
                color: 'inherit',
                marginLeft: 10,
                fontWeight: 700,
                fontSize: 20,
                lineHeight: '20px',
                [media.lessThan('large')]: {
                  fontSize: 16,
                  marginTop: 1,
                },
                [media.lessThan('small')]: {
                  // Visually hidden
                  position: 'absolute',
                  overflow: 'hidden',
                  clip: 'rect(0 0 0 0)',
                  height: 1,
                  width: 1,
                  margin: -1,
                  padding: 0,
                  border: 0,
                },
              }}>
              DICOM
            </Box>
          </Link>
        </Col>
        <Col>
          <Box
            as='nav'
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
              overflowX: 'auto',
              overflowY: 'hidden',
              WebkitOverflowScrolling: 'touch',
              height: '100%',

              // Hide horizontal scrollbar
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '::-webkit-scrollbar': {
                display: 'none',
              },

              [media.size('xsmall')]: {
                flexGrow: '1',
                width: 'auto',
              },
              [media.greaterThan('xlarge')]: {
                width: null,
              },
              [media.lessThan('small')]: {
                maskImage:
                  'linear-gradient(to right, transparent, black 20px, black 90%, transparent)',
              },
            }}>
          </Box>
        </Col>
        <Col>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: 'auto',

              //[media.lessThan('medium')]: {
              //width: 'auto',
              //},
              //[media.greaterThan('large')]: {
              //width: 'calc(100% / 4)',
              //},
            }}>
            <Link
              style={{
                width: '200px',
                padding: '5px 10px',
                whiteSpace: 'nowrap',
                ...fonts.small,

                ':hover': {
                  color: colors.brand,
                },

                ':focus': {
                  outline: 0,
                  backgroundColor: colors.lighter,
                  borderRadius: 15,
                },

                [media.lessThan('medium')]: {
                  display: 'none',
                },
              }}
              to="/versions">
              v{version}
            </Link>
          </Box>
        </Col>
      </Row>
    </Grid>
  </Box>
);

export default AppHeader;
