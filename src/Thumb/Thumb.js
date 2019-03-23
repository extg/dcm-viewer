import React from 'react'
import styled from 'styled-components'
import system from '@smooth-ui/system'

const styles = {
  root: {
    display: 'inline-block',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
  rounded: {
    borderRadius: '50%',
  },
}

// 70 + 8 + 16 = 94

const Picture = styled.picture(
  system({
    display: 'inline-block',
    overflow: 'hidden',
    maxHeight: 'calc(100vh - 94px)',
    // overflow: 'auto',
  }),
)

const Img = styled.img(
  system({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  }),
)

const Thumb = ({src, srcSet, height, width, alt, onError, ...props}) => {
  const style = {
    width,
    height,
    paddingTop: undefined,
  };

  const imgStyle = {};
  const pictureStyle = {};

  // Для случаев, когда для Thumb у нас явно задана процентная высота или ширина
  // относительно его контейнера, мы должны явно задать 100% ширину его детям: <picture> и <img>.
  // Если этого не сделать, <img> не будет верно тянуться или ужиматься.
  // Если же задана иная величина, то ограничиваем ей размер изображения.
  if (typeof style.height === 'string' && style.height.substr(-1) === '%') {
    imgStyle.height = '100%';
    pictureStyle.height = '100%';
  } else if (style.height) {
    imgStyle.maxHeight = height;
  }

  if (typeof style.width === 'string' && style.width.substr(-1) === '%') {
    imgStyle.width = '100%';
    pictureStyle.width = '100%';
  } else if (style.width) {
    imgStyle.maxWidth = width;
  }

  return (
    <Picture style={pictureStyle} {...props}>
      <source srcSet={srcSet} />
      <Img
        className={styles.img}
        src={src}
        alt={alt}
        style={imgStyle}
        onError={onError}
      />
    </Picture>
  )
}

export default Thumb
