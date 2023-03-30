import API_BASE_URL from '../config';
import adaptarMenus from '../adapters/menuadapter'


export default async function getMenus() {
  const response = await fetch(`${API_BASE_URL}/menus`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const menus = adaptarMenus(await response.json())
  return await menus
}