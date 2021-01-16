export const colors = {
  bg: '#19191b',
  bubble: '#2b333b',
  subText: '#cacaca',
  line: '#2c2d34',
  mainText: 'white',
  actionText: '#4695fc',
  inputBg: '#2b2c33',
  mainButtonBg: '#137bd1',
  popupBg: '#262627',
  danger: '#ff4943',
  inactiveTab: '#a6a6a6',
};

export enum Weight {
  regular,
  semiBold,
  medium,
  bold,
}

export function getFont(weight: Weight, size: number) {
  switch (weight) {
    case Weight.bold:
      return {
        fontFamily: 'SFUIDisplay-Bold',
        fontSize: size,
      };
    case Weight.medium:
      return {
        fontFamily: 'SFUIDisplay-Medium',
        fontSize: size,
      };
    case Weight.semiBold:
      return {
        fontFamily: 'SFUIDisplay-SemiBold',
        fontSize: size,
      };
    default:
      return {
        fontFamily: 'SFUIDisplay-Regular',
        fontSize: size,
      };
  }
}
