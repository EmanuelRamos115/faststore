import { Modal, ModalHeader, ModalBody } from '@faststore/ui'

import styles from './SizeGuideModal.module.scss'

type SizeGuideModalProps = {
  toggleOpen: () => void
}
const SizeGuideModal = ({ toggleOpen }: SizeGuideModalProps) => {
  return (
    <Modal className={styles.modal} onDismiss={toggleOpen}>
      <div className={styles.modalContentWrapper}>
        <ModalHeader description="" onClose={toggleOpen} title="" />
        <ModalBody>
          <table cellSpacing="0" cellPadding="0">
            <thead className={styles.modalTableHead}>
              <tr>
                <th>Men's</th>
                <th>Women's</th>
                <th>EU</th>
              </tr>
            </thead>
            <tbody className={styles.modalTableBody}>
              <tr>
                <td>3</td>
                <td>5</td>
                <td>35</td>
              </tr>
              <tr>
                <td>4</td>
                <td>6</td>
                <td>36</td>
              </tr>
              <tr>
                <td>5</td>
                <td>7</td>
                <td>37</td>
              </tr>
              <tr>
                <td>6</td>
                <td>8</td>
                <td>38</td>
              </tr>
              <tr>
                <td>7</td>
                <td>9</td>
                <td>39</td>
              </tr>
              <tr>
                <td>8</td>
                <td>10</td>
                <td>40</td>
              </tr>
              <tr>
                <td>9</td>
                <td>11</td>
                <td>41</td>
              </tr>
              <tr>
                <td>10</td>
                <td>12</td>
                <td>42</td>
              </tr>
              <tr>
                <td>11</td>
                <td>13</td>
                <td>43</td>
              </tr>
              <tr>
                <td>12</td>
                <td>14</td>
                <td>44</td>
              </tr>
              <tr>
                <td>13</td>
                <td>15</td>
                <td>45</td>
              </tr>
              <tr>
                <td>14</td>
                <td>16</td>
                <td>46</td>
              </tr>
            </tbody>
          </table>
        </ModalBody>
      </div>
    </Modal>
  )
}

export default SizeGuideModal
