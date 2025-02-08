import {
  animate,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeIn: AnimationTriggerMetadata = trigger('fadeIn', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate('500ms ease-in', style({ opacity: 1 })),
  ]),
]);
export const fadeOut: AnimationTriggerMetadata = trigger('fadeOut', [
  transition(':leave', [
    style({
      opacity: 1,
    }),
    animate('500ms ease-out', style({ opacity: 0 })),
  ]),
]);

export const transformIn: AnimationTriggerMetadata = trigger('transformIn', [
  transition(':enter', [
    style({
      transform: 'translate(-50%, -50%) scale(0)',
    }),
    animate(
      '300ms ease-in',
      style({ transform: 'translate(-50%, -50%) scale(1)' }),
    ),
  ]),
]);
export const transformOut: AnimationTriggerMetadata = trigger('transformOut', [
  transition(':leave', [
    style({
      transform: 'translate(-50%, -50%) scale(1)',
    }),
    animate(
      '300ms ease-out',
      style({ transform: 'translate(-50%, -50%) scale(0)' }),
    ),
  ]),
]);
