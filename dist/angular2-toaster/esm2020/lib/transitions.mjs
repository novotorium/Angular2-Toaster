import { trigger, state, style, animate, transition, group } from '@angular/animations';
export const Transitions = [
    trigger('toastState', [
        state('flyRight, flyLeft, slideDown, slideDown, slideUp, slideUp, fade', style({ opacity: 1, transform: 'translate(0,0)' })),
        transition('void => flyRight', [
            style({
                opacity: 0,
                transform: 'translateX(100%)',
                height: 0
            }),
            animate('0.15s ease-in', style({
                opacity: 1,
                height: '*'
            })),
            animate('0.25s 15ms ease-in')
        ]),
        transition('flyRight => void', [
            animate('0.25s ease-out', style({
                opacity: 0,
                transform: 'translateX(100%)'
            })),
            animate('0.15s ease-out', style({
                height: 0
            }))
        ]),
        transition('void => flyLeft', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)',
                height: 0
            }),
            animate('0.15s ease-in', style({
                opacity: 1,
                height: '*'
            })),
            animate('0.25s 15ms ease-in')
        ]),
        transition('flyLeft => void', [
            animate('0.25s 10ms ease-out', style({
                opacity: 0,
                transform: 'translateX(-100%)'
            })),
            animate('0.15s ease-out', style({
                height: 0
            }))
        ]),
        transition('void => slideDown', [
            style({
                opacity: 0,
                transform: 'translateY(-500%)',
                height: 0
            }),
            group([
                animate('0.2s ease-in', style({
                    height: '*'
                })),
                animate('0.4s ease-in', style({
                    transform: 'translate(0,0)'
                })),
                animate('0.3s 0.1s ease-in', style({
                    opacity: 1
                }))
            ])
        ]),
        transition('slideDown => void', group([
            animate('0.3s ease-out', style({
                opacity: 0
            })),
            animate('0.4s ease-out', style({
                transform: 'translateY(-500%)'
            })),
            animate('0.2s 0.2s ease-out', style({
                height: 0
            }))
        ])),
        transition('void => slideUp', [
            style({
                opacity: 0,
                transform: 'translateY(1000%)',
                height: 0
            }),
            group([
                animate('0.2s ease-in', style({
                    height: '*'
                })),
                animate('0.5s ease-in', style({
                    transform: 'translate(0,0)'
                })),
                animate('0.3s 0.1s ease-in', style({
                    opacity: 1
                }))
            ])
        ]),
        transition('slideUp => void', group([
            animate('0.3s ease-out', style({
                opacity: 0
            })),
            animate('0.5s ease-out', style({
                transform: 'translateY(1000%)'
            })),
            animate('0.3s 0.15s ease-out', style({
                height: 0
            }))
        ])),
        transition('void => fade', [
            style({
                opacity: 0,
                height: 0
            }),
            animate('0.20s ease-in', style({
                height: '*'
            })),
            animate('0.15s ease-in', style({
                opacity: 1
            }))
        ]),
        transition('fade => void', [
            group([
                animate('0.0s ease-out', style({
                    // reposition the background to prevent
                    // a ghost image during transition
                    'background-position': '-99999px'
                })),
                animate('0.15s ease-out', style({
                    opacity: 0,
                    'background-image': ''
                })),
                animate('0.3s 20ms ease-out', style({
                    height: 0
                }))
            ])
        ])
    ]),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYW5ndWxhcjItdG9hc3Rlci9zcmMvbGliL3RyYW5zaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFDcEQsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUc7SUFDdkIsT0FBTyxDQUFDLFlBQVksRUFBRTtRQUNsQixLQUFLLENBQUMsaUVBQWlFLEVBQ25FLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUN2RCxVQUFVLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsS0FBSyxDQUFDO2dCQUNGLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFNBQVMsRUFBRSxrQkFBa0I7Z0JBQzdCLE1BQU0sRUFBRSxDQUFDO2FBQ1osQ0FBQztZQUNGLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDO2dCQUMzQixPQUFPLEVBQUUsQ0FBQztnQkFDVixNQUFNLEVBQUUsR0FBRzthQUNkLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztTQUNoQyxDQUFDO1FBQ0YsVUFBVSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFNBQVMsRUFBRSxrQkFBa0I7YUFDaEMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQztnQkFDNUIsTUFBTSxFQUFFLENBQUM7YUFDWixDQUFDLENBQUM7U0FDTixDQUFDO1FBQ0YsVUFBVSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLEtBQUssQ0FBQztnQkFD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LENBQUM7YUFDWixDQUFDO1lBQ0YsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUM7Z0JBQzNCLE1BQU0sRUFBRSxHQUFHO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUM7Z0JBQzNCLE9BQU8sRUFBRSxDQUFDO2FBQ2IsQ0FBQyxDQUFDO1NBRU4sQ0FBQztRQUNGLFVBQVUsQ0FBQyxjQUFjLEVBQUU7WUFDdkIsS0FBSyxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDO29CQUMzQix1Q0FBdUM7b0JBQ3ZDLGtDQUFrQztvQkFDbEMscUJBQXFCLEVBQUUsVUFBVTtpQkFDcEMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUM7b0JBQzVCLE9BQU8sRUFBRSxDQUFDO29CQUNWLGtCQUFrQixFQUFFLEVBQUU7aUJBQ3pCLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDO29CQUNoQyxNQUFNLEVBQUUsQ0FBQztpQkFDWixDQUFDLENBQUM7YUFDTixDQUFDO1NBQ0wsQ0FBQztLQUNMLENBQUM7Q0FDTCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgXHJcbiAgICB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24sIGdyb3VwIFxyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRyYW5zaXRpb25zID0gW1xyXG4gICAgdHJpZ2dlcigndG9hc3RTdGF0ZScsIFtcclxuICAgICAgICBzdGF0ZSgnZmx5UmlnaHQsIGZseUxlZnQsIHNsaWRlRG93biwgc2xpZGVEb3duLCBzbGlkZVVwLCBzbGlkZVVwLCBmYWRlJywgXHJcbiAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsMCknIH0pKSxcclxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGZseVJpZ2h0JywgW1xyXG4gICAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGFuaW1hdGUoJzAuMTVzIGVhc2UtaW4nLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICBhbmltYXRlKCcwLjI1cyAxNW1zIGVhc2UtaW4nKVxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIHRyYW5zaXRpb24oJ2ZseVJpZ2h0ID0+IHZvaWQnLCBbXHJcbiAgICAgICAgICAgIGFuaW1hdGUoJzAuMjVzIGVhc2Utb3V0Jywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgYW5pbWF0ZSgnMC4xNXMgZWFzZS1vdXQnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDBcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgXSksXHJcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBmbHlMZWZ0JywgW1xyXG4gICAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLCBcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTEwMCUpJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgYW5pbWF0ZSgnMC4xNXMgZWFzZS1pbicsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJ1xyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIGFuaW1hdGUoJzAuMjVzIDE1bXMgZWFzZS1pbicpXHJcbiAgICAgICAgXSksXHJcbiAgICAgICAgdHJhbnNpdGlvbignZmx5TGVmdCA9PiB2b2lkJywgW1xyXG4gICAgICAgICAgICBhbmltYXRlKCcwLjI1cyAxMG1zIGVhc2Utb3V0Jywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCwgXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC0xMDAlKSdcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICBhbmltYXRlKCcwLjE1cyBlYXNlLW91dCcsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMFxyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICBdKSxcclxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHNsaWRlRG93bicsIFtcclxuICAgICAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCwgXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MDAlKScsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGdyb3VwKFtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzAuMnMgZWFzZS1pbicsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJ1xyXG4gICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnMC40cyBlYXNlLWluJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLDApJ1xyXG4gICAgICAgICAgICAgICAgfSkpLCBcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzAuM3MgMC4xcyBlYXNlLWluJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIHRyYW5zaXRpb24oJ3NsaWRlRG93biA9PiB2b2lkJywgZ3JvdXAoW1xyXG4gICAgICAgICAgICBhbmltYXRlKCcwLjNzIGVhc2Utb3V0Jywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIGFuaW1hdGUoJzAuNHMgZWFzZS1vdXQnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MDAlKSdcclxuICAgICAgICAgICAgfSkpLCBcclxuICAgICAgICAgICAgYW5pbWF0ZSgnMC4ycyAwLjJzIGVhc2Utb3V0Jywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwXHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgIF0pKSxcclxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHNsaWRlVXAnLCBbXHJcbiAgICAgICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsIFxyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgxMDAwJSknLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBncm91cChbXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcwLjJzIGVhc2UtaW4nLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcclxuICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1pbicsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwwKSdcclxuICAgICAgICAgICAgICAgIH0pKSwgXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcwLjNzIDAuMXMgZWFzZS1pbicsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdKSxcclxuICAgICAgICB0cmFuc2l0aW9uKCdzbGlkZVVwID0+IHZvaWQnLCBncm91cChbXHJcbiAgICAgICAgICAgIGFuaW1hdGUoJzAuM3MgZWFzZS1vdXQnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLW91dCcsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMTAwMCUpJ1xyXG4gICAgICAgICAgICB9KSksIFxyXG4gICAgICAgICAgICBhbmltYXRlKCcwLjNzIDAuMTVzIGVhc2Utb3V0Jywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwXHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgIF0pKSxcclxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGZhZGUnLCBbXHJcbiAgICAgICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGFuaW1hdGUoJzAuMjBzIGVhc2UtaW4nLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJ1xyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIGFuaW1hdGUoJzAuMTVzIGVhc2UtaW4nLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICBdKSxcclxuICAgICAgICB0cmFuc2l0aW9uKCdmYWRlID0+IHZvaWQnLCBbXHJcbiAgICAgICAgICAgIGdyb3VwKFtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzAuMHMgZWFzZS1vdXQnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwb3NpdGlvbiB0aGUgYmFja2dyb3VuZCB0byBwcmV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYSBnaG9zdCBpbWFnZSBkdXJpbmcgdHJhbnNpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLXBvc2l0aW9uJzogJy05OTk5OXB4J1xyXG4gICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnMC4xNXMgZWFzZS1vdXQnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6ICcnXHJcbiAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcwLjNzIDIwbXMgZWFzZS1vdXQnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdKVxyXG4gICAgXSksXHJcbl0iXX0=