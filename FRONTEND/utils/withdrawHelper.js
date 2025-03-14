/* In Mini Programs, Files listed under the pages field in app.json are treated as top-level pages, not regular reusable JavaScript modules.
These files cannot be imported elsewhere since the framework expects them to function independently.
import Withdraw from '../withdraw/withdraw.js'; // Not allowed
Move any reusable logic or functionality from withdraw.js into a standalone utility or helper file.
 */

