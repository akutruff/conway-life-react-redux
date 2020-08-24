
import React from 'react';
import { ActionCreators } from 'redux-undo';
import { useDispatch } from 'react-redux';

export function SimulationControls() {
    return (
        <div className="SimulationControls">
            <div>
                Generation: {1}
            </div>

            <button>
                Play
           </button>
            <button>
                Pause
           </button>
            <button>
                Undo
           </button>
            <button>
                Redo
            </button>
        </div>);
}

// export function SimulationControls() {
//     const dispatch = useDispatch();

//     return (
//         <div>
//             <button
//                 onClick={() => dispatch(ActionCreators.undo())}
//                 style={{ marginLeft: 10 }}
//             >
//                 Undo
//            </button>
//             <button
//                 onClick={() => dispatch(ActionCreators.redo())}
//                 style={{ marginLeft: 10 }}
//             >
//                 Redo
//             </button>
//         </div>);
// }
